export default class Elevator {
  constructor() {
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.requests = []
    this.riders= []
  }

  dispatch() {
    while (this.requests.length > 0) {
      const person = this.requests[0]
      this.goToFloor(person)
    }
  }

  goToFloor(person){  
    while (this.currentFloor !== person.currentFloor) {
      this.currentFloor < person.currentFloor ? this.moveUp() : this.moveDown()
    }
    this.hasPickup()
    while (this.currentFloor !== person.dropOffFloor) {
      this.currentFloor < person.dropOffFloor ? this.moveUp() : this.moveDown()
    }
    this.hasDropoff()
    if (this.checkReturnToLoby()) {
      this.returnToLoby()
    }
  }

  moveUp(){
    this.currentFloor++
    this.floorsTraversed++
    if(this.hasStop()){
      this.stops++
    }    
  }

  moveDown(){
    if(this.currentFloor > 0){      
      this.currentFloor--
      this.floorsTraversed++
      if(this.hasStop()){
        this.stops++
      }
    }
  }

  hasStop(){
    return this.hasPickup() || this.hasDropoff()
  }

  hasPickup(){
    const waiting = this.requests.filter(p => p.currentFloor === this.currentFloor)
    if (waiting.length > 0) {
      this.riders.push(...waiting)
      this.requests = this.requests.filter(p => p.currentFloor !== this.currentFloor)
      return true
    }
    return false
  }

  hasDropoff(){
    const droppingOff = this.riders.filter(p => p.dropOffFloor === this.currentFloor)
    if (droppingOff.length > 0) {
      this.riders = this.riders.filter(p => p.dropOffFloor !== this.currentFloor)
      return true
    }
    return false
  }

  checkReturnToLoby(){
    const isBeforeNoon = new Date().getHours() < 12
    return this.riders.length === 0 && isBeforeNoon
  }

  returnToLoby(){
    while(this.currentFloor > 0){
      this.moveDown()
    }
  }

  reset(){
    this.currentFloor = 0
    this.stops = 0
    this.floorsTraversed = 0
    this.riders = []
  }
}
