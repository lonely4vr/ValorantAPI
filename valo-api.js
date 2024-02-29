
async function fetchAgent() {
    try {
        const agentName = document.getElementById("agentName").value.toLowerCase();
        const response = await fetch(`https://valorant-api.com/v1/agents`);
        if (!response.ok) {
            throw new Error("Could not fetch agents data");
        }

        const parsedData = await response.json();
        
        let foundAgent = null;
        parsedData.data.forEach(agent => {
            if (agent.displayName.toLowerCase() === agentName) {
                foundAgent = agent;
                return; // Exit the loop once the agent is found
            }
        });
        //if the input is matched with the displayName then we return the following fields
        if (foundAgent) {
            const agentInfoContainer = document.getElementById("agentInfo");
            agentInfoContainer.innerHTML = ""; // Clear previous data

            const nameElement = document.createElement("p");
            nameElement.textContent = `Agent Name: ${foundAgent.displayName}`;
            agentInfoContainer.appendChild(nameElement);

            const developerElement = document.createElement("p");
            developerElement.textContent = `Agent Developer Name: ${foundAgent.developerName}`;
            agentInfoContainer.appendChild(developerElement);

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = `Agent Description: ${foundAgent.description}`;
            agentInfoContainer.appendChild(descriptionElement);

            const imageElement = document.getElementById("agentImage");
            imageElement.src = foundAgent.displayIcon;
            imageElement.style.display = "block"; // Show the image
        } else {
            alert("Agent not found");
            console.log('Agent not found');
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchAgent(); //call the function
