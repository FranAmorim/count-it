const stringSave = window.localStorage.getItem('saved')


const data = stringSave ? JSON.parse(stringSave) : [];



function add() {
    const name = document.getElementById('name')
    data.push({
        name: name.value,
        count: 0,
    })

    console.log(name)

    window.localStorage.setItem('saved', JSON.stringify(data))
}

function save() {
    window.localStorage.setItem('saved', JSON.stringify(data))
}

function render() {
    console.log(data)
    const container = document.getElementById('ctn');
    container.innerHTML = '';

    for (let item of data) {
        console.log(item);
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.onclick = () => {
            item.count -= 1;
            save()
            render()
        }

        const nameEle = document.createElement('p');
        nameEle.textContent = item.name;

        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.onclick = () => {
            item.count += 1;
            save()
            render()
        }

        
        const totalEle = document.createElement('p');
        totalEle.textContent = `Total ${item.count}`;


        const fiedset = document.createElement('fieldset');
        fiedset.role = 'group';
        fiedset.appendChild(minusBtn)
        fiedset.appendChild(nameEle)
        fiedset.appendChild(plusBtn)

        const wrapper = document.createElement('article');
        wrapper.classList.add('list-element');

        
        wrapper.appendChild(fiedset)
        wrapper.appendChild(totalEle)
    
        container.appendChild(wrapper)
    }

    document.body.appendChild(container)
    
}

render()