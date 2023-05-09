import { deleteRequest, fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"



const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

/* main element event listener (render HTML again)*/
mainContainer.addEventListener(
    "stateChanged",     // custum event (look in dataAccess.js)
    customEvent => {
        render()        //re-calls function
    }
)


/* click event listener (deletes request from database on click) */
mainContainer.addEventListener(
    'click',
    (clickEvent) => {
        const clickedItem = clickEvent.target
        if (clickedItem.id.startsWith('request--')) {
            const [, requestId] = clickedItem.id.split("--")

            deleteRequest(parseInt(requestId))
        }
    }
)