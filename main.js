const stringSave = window.localStorage.getItem('saved')


let data = stringSave ? JSON.parse(stringSave) : [];

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

let DELETE_ITEM;

function add() {
    const name = document.getElementById('name')
    if (name.value !== '') {
        data.push({
            id: uniqueId(),
            name: name.value,
            count: 0,
        })
    
        name.value = '';
    
        render();
        window.localStorage.setItem('saved', JSON.stringify(data))
    }
}

function save() {
    window.localStorage.setItem('saved', JSON.stringify(data))
}

function render() {
    const container = document.getElementById('ctn');
    container.innerHTML = '';

    for (let item of data) {
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.onclick = () => {
            if (item.count > 0) {
                item.count -= 1;
            }
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

        
        const totalEle = document.createElement('h3');
        totalEle.textContent = `Total ${item.count}`;


        const fiedset = document.createElement('fieldset');
        fiedset.role = 'group';
        fiedset.appendChild(minusBtn)
        fiedset.appendChild(nameEle)
        fiedset.appendChild(plusBtn)

        const wrapper = document.createElement('article');
        wrapper.classList.add('list-element');

        
       

        wrapper.appendChild(fiedset)
        
        const line = document.createElement('div');
        line.classList.add('footer')
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';

        deleteBtn.onclick = () => {
            DELETE_ITEM = item.id;
            const modal = document.getElementById('modal');
            modal.open = true;
        }
        
        line.appendChild(totalEle)
        line.appendChild(deleteBtn)

        
        wrapper.appendChild(line)
        container.appendChild(wrapper)
    }

    document.body.appendChild(container)
    
}

render()

function apagarItem() {

    data = data.filter(item => item.id !== DELETE_ITEM);

    
    render();
    window.localStorage.setItem('saved', JSON.stringify(data))
    DELETE_ITEM = null;
    closeModal()
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.open = false;
}