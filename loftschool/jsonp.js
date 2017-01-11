function updateData(data) {
  dataField.value = data.join(', ');
}

getData.addEventListener('click', function() {
  var jsonScript = document.createElement('script');

  document.head.appendChild(jsonScript);

  jsonScript.onload = jsonScript.onerror = function() {
    jsonScript.parentNode.removeChild(jsonScript);
  };
  jsonScript.src = 'citiesp.json';
});
