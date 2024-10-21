import { NextResponse } from "next/server";

// Initialize users in-memory (for simplicity)
let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com" },
  { id: 4, name: "Emily Brown", email: "emily.brown@example.com" },
  { id: 5, name: "Alex Wilson", email: "alex.wilson@example.com" },
];

// Handle GET request
export async function GET() {
  return NextResponse.json(users);
}

// Handle POST request
export async function POST(req) {
  const body = await req.json();

  const { name, email } = body;
  const newUser = {
    id: (users.at(-1)?.id ?? 0) + 1,
    name,
    email,
  };
  const isEmailExist = users.find(user => user.email === email)
  if(isEmailExist){
    return NextResponse.json({error: "A user with the same email already exists."}, { status: 403 });
  }
  // Add the new user to the list
  users.push(newUser);

  // Log the new user (simulating saving to a database)
  console.log("New user added:", newUser);

  // Return the new user in the response
  return NextResponse.json(newUser, { status: 201 });
}

export async function DELETE(req) {
  
  const body = await req.json();

  const { id } = body;
  if(!id){
    return NextResponse.json({error: "User not Found"}, { status: 404 });
  }

  // Add the new user to the list
  users = users.filter(user => user.id !== id);

  // Log the new user (simulating saving to a database)
  console.log("user deleted ID:", id);

  // Return the new user in the response
  return NextResponse.json(users, { status: 201 });
}
