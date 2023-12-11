export default class Timer {
    constructor(value, timeChangeValue){
        this.value              = value             //valor de temporizador
        this.timeChangeCounter  = 0                 //temporizador para cambiar valor (segundos)
        this.timeChangeValue    = timeChangeValue   //tiempo para cambiar valor (segundos)
    }
}