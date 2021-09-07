const data_container = document.querySelector(".data-container");
const sort_btn = document.querySelector(".sort-btn");

function generate_random_bars(_len = 20) {
    for (let i = 0; i < _len ; i++) {
        const bar_height = Math.floor(Math.random() * 100) + 1;

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${bar_height * 5}px`;
        
        bar_label = document.createElement("div");
        bar_label.classList.add("bar_label");
        bar_label.innerHTML = `${bar_height}`;
        bar.appendChild(bar_label);

        data_container.appendChild(bar);
    }
}

function wait(_time = 100) {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, _time)
    );
}

async function selection_sort(_len = 20) {
    const bars = document.querySelectorAll(".bar");
    for(let i = 0; i < _len ; i++) {
        let min_idx = i;
        let min_ele = parseInt(bars[i].childNodes[0].innerHTML);
        bars[i].classList.add("bar-dark");
        await wait();

        for(let j = i + 1; j < _len ; j++) {
            bars[j].classList.add("bar-active");
            await wait();
            bars[j].classList.remove("bar-active");

            let _ele = parseInt(bars[j].childNodes[0].innerHTML);
            if(_ele <= min_ele) {
                bars[min_idx].classList.remove("bar-min");
                min_ele = _ele;
                min_idx = j;
                bars[min_idx].classList.add("bar-min");
            }
        }

        bars[min_idx].classList.remove("bar-min");
        
        // swap both bars
        let _temp = parseInt(bars[i].childNodes[0].innerHTML);
        bars[i].childNodes[0].innerHTML = min_ele;
        bars[i].style.height = `${min_ele * 5}px`;

        bars[min_idx].childNodes[0].innerHTML = _temp;
        bars[min_idx].style.height = `${_temp * 5}px`;

        bars[i].classList.add("bar-success");
    }

    same_color();
}

async function same_color(_len = 20) {
    const bars = document.querySelectorAll(".bar");
    for(let i = 0 ; i < _len ; i++) {
        bars[i].classList.remove("bar-success");
        bars[i].classList.remove("bar-active");
        bars[i].classList.remove("bar-dark");
        bars[i].classList.remove("bar-min");
        await wait();
    }
}

function refresh() {
    window.location.reload();
}

let bars = 20;

if(window.innerWidth < 480) {
    bars = 10;
} else if(window.innerWidth < 620) {
    bars = 15;
}

sort_btn.addEventListener('click', () => {
    // disable sort button
    document.querySelector(".sort-btn").disabled = true;

    // seletion sort
    selection_sort(bars);
});

generate_random_bars(bars);