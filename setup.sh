#!/bin/bash

echo "Setting up Partnergize Platform..."
echo

echo "Installing dependencies..."
npm install

echo
echo "Generating Prisma client..."
npm run db:generate

echo
echo "Please make sure you have:"
echo "1. MySQL running"
echo "2. Created a database named 'partnergize'"
echo "3. Updated your .env file with correct database URL"
echo

echo "To continue setup:"
echo "1. Copy env.example to .env and update the database URL"
echo "2. Run: npm run db:push"
echo "3. Run: npm run db:init"
echo "4. Run: npm run dev"
echo

read -p "Press Enter to continue..."
