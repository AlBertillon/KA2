const img = document.querySelector('.img');
const description = document.querySelector('.description');
const form = document.querySelector('.form');
const redactionInfoButton = document.querySelector('.redaction_info_button');

//Функция для запроса данных
const getImg = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos/1');
    const data = await response.json();

    img.src = data.url;
    description.innerHTML = data.title;
}

getImg()

//Функция для запроса на обновления данных
const sendData = async (newData) => {
    return await fetch('/tipo-rest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(newData)
    }).then(() => {
        getImg()
    })
}

// Обработчик события изменения данных в форме
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);

    const text = formData.get('text');

    const userData = {
        description: text,
    }

    sendData(userData);
    form.reset();
})