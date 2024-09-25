import base64
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
import json
import os
from PIL import Image
import torch
from torchvision.transforms.functional import pil_to_tensor

# Load the PyTorch model and set to evaluation mode
device = (
    "cuda"
    if torch.cuda.is_available()
    else "mps"
    if torch.backends.mps.is_available()
    else "cpu"
)

labels_map = {
    0: "Did not normalise point to light vector.",
    1: "Did not normalise view vector.",
    2: "Did not apply the max function in the diffuse calculation.",
    3: "Did not apply the max function in the specular calculation.",
    4: "Applied the pow function inside the max function.",
    5: "Did not negate the point to light normalised vector inside reflect OR calculated a camera to point vector instead of a point to camera vector.",
    6: "Calculated a light to point vector instead of a point to light vector.",
    7: "Did not consider light intensity decreases with distance to light in specular calcluation.",
    8: "Did not nudge shadow ray.",
    9: "Did not normalise normal."
}

model_path = "analyze/static/analyze/model.pth"
model = torch.load(model_path).to(device)
model.eval()


@csrf_exempt
def upload(request):
    if request.method == "POST":
        try: 
            # Get the base64 image data from the request
            data = json.loads(request.body)
            image_data = data.get('image')

            # Decode the base64 image
            _, imgstr = image_data.split(';base64,')
            image_bytes = base64.b64decode(imgstr)

            # Convert to tensor
            image = Image.open(BytesIO(image_bytes))
            image = pil_to_tensor(image).to(device)
            image = (image / 255).to(torch.float32).unsqueeze(0)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        # A 1-D tensor with size (num_output_neurons,)
        prediction = model(image).squeeze()
        
        possible_errors = {}
        for label, output in enumerate(prediction):
            if output > 0.5:
                possible_errors[label] = labels_map[label]

        return JsonResponse(possible_errors)
    
    return JsonResponse({'error': "Invalid request method"}, status=405)
