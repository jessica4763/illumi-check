function Results({ results }) {
    if (!results) {
        return <p className="text header-text placeholder-text">results will be displayed here</p>
    } else {
        const errors = Object.values(results);
        return (
            <div class="results-container">
                <ul>
                    {
                        errors.map((error, label) => {
                            return <li key={label}>{error}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
} 


export default Results;