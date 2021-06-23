import axios from 'axios'
export function burypoint(adminId, eventName) {
    axios.get("/manage/log/collect?admin_id=" + adminId + "&event=" + eventName)
        .then(response => {
            console.log(response)
        })
        .catch(error => {});
}