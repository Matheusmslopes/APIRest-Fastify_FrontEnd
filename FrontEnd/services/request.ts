
export function request<TResponse>(
    url: string,
    config: RequestInit = {}
): Promise<TResponse> {
    return fetch(url, config)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); 
        })
        .then((responseText) => {
            console.log('Response Text:', responseText); 
            try {
                return JSON.parse(responseText) as TResponse;
            } catch (error) {
                throw new Error('Failed to parse JSON: ' + responseText);
            }
        });
}