const detailsContainer = document.querySelector("#request-details");

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const eventDate = params.get("eventDate");
const guests = params.get("guests");
const eventType = params.get("eventType");
const location = params.get("location");

detailsContainer.innerHTML = `
    <h3>Request Details</h3>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
    <p><strong>Event Date:</strong> ${eventDate}</p>
    <p><strong>Guests:</strong> ${guests}</p>
    <p><strong>Event Type:</strong> ${eventType}</p>
    <p><strong>Location:</strong> ${location}</p>
`;