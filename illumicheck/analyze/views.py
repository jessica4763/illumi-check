import base64
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from io import BytesIO
import json
from PIL import Image
import torch
from torchvision.transforms.functional import pil_to_tensor

# Load the PyTorch model and set to evaluation mode
# model_path = "static/analyze/model.pth"
# model = torch.load(model_path)
# model.eval()


def get_csrf_token(request):
    csrfToken = get_token(request)
    response = JsonResponse({'csrfToken': csrfToken})
    return response


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
            image = pil_to_tensor(image)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

        # # A 1-D tensor with size (num_output_neurons,)
        # prediction = model(img).squeeze()

        # return HttpResponse(str(torch.max(prediction).item()))

        return HttpResponse(str(image))
    
    return JsonResponse({'error': "Invalid request method"}, status=405)
