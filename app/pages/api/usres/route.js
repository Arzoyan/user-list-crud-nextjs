let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com" },
  { id: 4, name: "Emily Brown", email: "emily.brown@example.com" },
  { id: 5, name: "Alex Wilson", email: "alex.wilson@example.com" },
];

// Handle GET and POST requests
export default function handler(req, res) {
  if (req.method === "GET") {
    // Return the list of users
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };

    // Add new user to the in-memory list
    users.push(newUser);

    // Log the new user (simulating saving it)
    console.log("New user added:", newUser);

    // Respond with the new user
    res.status(201).json(newUser);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
