const section = document.querySelector('section');

export function drawTable(rows, cols, sortFn, clearStats, diffWords) {
  const buttonReset = document.createElement('button');  
  buttonReset.className = 'btn btn-outline-info reset';
  buttonReset.innerHTML = 'Reset';
  buttonReset.addEventListener('click', () => {
    clearStats();
  });
  section.appendChild(buttonReset);

  const buttonDif = document.createElement('button');  
  buttonDif.className = 'btn btn-outline-info reset';
  buttonDif.innerHTML = 'Revise difficult words';
  buttonDif.addEventListener('click', () => {
    diffWords();
  });
  section.appendChild(buttonDif);

  const table = document.createElement("table");
  table.className = "table table-hover";
  section.appendChild(table);

  createHeader(table, cols, sortFn);

  createBody(table, rows, cols)

}

function createHeader(table, cols, sortFn) {
  const thead = document.createElement("thead");
  table.appendChild(thead);
  
  const tr = document.createElement("tr");
  thead.appendChild(tr);

  cols.forEach((e, i) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = e[0].toUpperCase() + e.substring(1);
    if (i === 0) {
      th.innerHTML += `<i id="arrow_sort" class="fas fa-caret-down ml-2"></i>`;
    }
    th.style.cursor = "pointer";
    th.addEventListener("click", () => {
      sortFn(e);
      const arrow = document.getElementById("arrow_sort");
      if (arrow.parentNode === th) {
        arrow.classList.toggle("fa-caret-down")
        arrow.classList.toggle("fa-caret-up")
      } else {
        arrow.parentNode.removeChild(arrow);
        th.innerHTML += `<i id="arrow_sort" class="fas fa-caret-down ml-2"></i>`;
      }
    })
    tr.appendChild(th);
  });
}

function createBody(table, rows, cols) {
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  
  rows.forEach((e, i) => {
    const tr = document.createElement("tr");
    tr.id = `stat_r_${i}`;
    tbody.appendChild(tr);
    cols.forEach((c) => {
      const td = document.createElement("td");
      td.id = `stat_c_${i}_${c}`;
      td.innerHTML = e[c];
      tr.appendChild(td);
    });
  })
}

export function redraw(rows, cols) {
  rows.forEach((e, i) => {
    cols.forEach((c) => {
      const td = document.getElementById(`stat_c_${i}_${c}`);
      td.innerHTML = e[c];
    })
  })
}