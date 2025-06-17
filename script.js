// Utility: create and append a table
function createTable(title, data, keys) {
  const container = document.getElementById("dataContainer");

  const titleEl = document.createElement("div");
  titleEl.className = "section-title";
  titleEl.textContent = title;

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Header
  const headerRow = document.createElement("tr");
  keys.forEach(key => {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Data Rows
  data.forEach(item => {
    const row = document.createElement("tr");
    keys.forEach(key => {
      const td = document.createElement("td");
      td.textContent = item[key];
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(titleEl);
  container.appendChild(table);
}

// PromiseAPI1 - Fetch Posts after 1s
function PromiseAPI1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/posts')
        .then(res => res.json())
        .then(data => {
          createTable("Posts", data.posts.slice(0, 10), ["id", "title", "body"]);
          resolve(true);
        })
        .catch(error => console.error("Error in API1:", error));
    }, 1000);
  });
}

// PromiseAPI2 - Fetch Products after 2s
function PromiseAPI2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
          createTable("Products", data.products.slice(0, 10), ["id", "title", "price"]);
          resolve(true);
        })
        .catch(error => console.error("Error in API2:", error));
    }, 2000);
  });
}

// PromiseAPI3 - Fetch Todos after 3s
function PromiseAPI3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/todos')
        .then(res => res.json())
        .then(data => {
          createTable("Todos", data.todos.slice(0, 10), ["id", "todo", "completed"]);
          resolve(true);
        })
        .catch(error => console.error("Error in API3:", error));
    }, 3000);
  });
}

// Chain the promises
function startPromiseChain() {
  document.getElementById("dataContainer").innerHTML = "";

  PromiseAPI1()
    .then(res => {
      if (res) return PromiseAPI2();
    })
    .then(res => {
      if (res) return PromiseAPI3();
    })
    .catch(err => console.error("Promise chain error:", err));
}
