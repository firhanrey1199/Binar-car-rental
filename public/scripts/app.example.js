class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("search-button");
    this.carContainerElement = document.getElementById("cars-container");
    this.carContainerElement = document.getElementById("car-container-element");
    this.availDate = document.getElementById('avail-date');
    this.availTime = document.getElementById('avail-time');
    this.carCapacity = document.getElementById('car-capacity');
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = async () => {
    await this.load()
    this.clear()
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.className = 'col-md-4'
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const tanggal = this.availDate.value;
    const jam = this.availTime.value;
    const kapasitas = this.carCapacity.value;
    
    const carAvailable = new Date(`${tanggal} ${jam}`)
    const epochTime = carAvailable.getTime()

    const cars = await Binar.listCars((item) =>{
      const filterCapacity = item.capacity >= kapasitas;
      const filterDateTime = item.availableAt.getTime() < epochTime
      return filterCapacity && filterDateTime
    });
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
