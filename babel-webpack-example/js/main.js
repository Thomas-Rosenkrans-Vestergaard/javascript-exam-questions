import books from './books'; // es6 imports

const tbody = document.getElementById('target');

books.forEach((book) => {
  const tr = document.createElement('tr');
  ['title', 'year', 'language', 'pages'].forEach((k) => {
    const td = document.createElement('td');
    td.innerText = book[k];
    tr.appendChild(td);
  });

  console.log(tbody);
  tbody.appendChild(tr);
});
