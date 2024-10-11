// Define the number of cities and the distance matrix
const cities = ["A", "B", "C", "D"];
const distMatrix = [
  [0, 10, 15, 20],  // Distances from A to A, B, C, D
  [10, 0, 35, 25],  // Distances from B to A, B, C, D
  [15, 35, 0, 30],  // Distances from C to A, B, C, D
  [20, 25, 30, 0]   // Distances from D to A, B, C, D
];

// Initialize variables for storing the minimum path and its cost
let minPath = [];
let minCost = Infinity;

// Function to calculate the total cost of a given path
function calculatePathCost(path) {
  let cost = 0;
  for (let i = 0; i < path.length - 1; i++) {
    cost += distMatrix[path[i]][path[i + 1]];
  }
  // Add the cost to return to the starting city
  cost += distMatrix[path[path.length - 1]][path[0]];
  return cost;
}

// Function to generate all permutations of cities and find the minimum path
function findTSPPath(cities) {
  const n = cities.length;
  const permutations = [];

  // Generate all permutations using backtracking
  function permute(path, visited) {
    if (path.length === n) {
      permutations.push([...path]);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        path.push(i);
        permute(path, visited);
        path.pop();
        visited[i] = false;
      }
    }
  }

  permute([], new Array(n).fill(false));

  // Find the permutation with the minimum cost
  permutations.forEach(path => {
    const cost = calculatePathCost(path);
    if (cost < minCost) {
      minCost = cost;
      minPath = path;
    }
  });
}

// Find the optimal path
findTSPPath(cities);

// Output the result
const pathNames = minPath.map(index => cities[index]);
console.log(`Minimum path: ${pathNames.join(" -> ")} -> ${pathNames[0]}`);
console.log(`Minimum cost: ${minCost}`);
