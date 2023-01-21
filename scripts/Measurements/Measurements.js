export class Measurements {
    measurements = {}
    Measurements( ) {
        
    }

    /**
     * requiredMeasurements must be array of id's from MeasurementsEnum
     */
    getMeasurementsFromUserInput(requiredMeasurements) {
          requiredMeasurements.forEach(
            key => {
                this.measurements[key] = this.getUserInputValue(key);
            }
          )
          return this.measurements;
    }



    getUserInputValue(key){
     return   parseFloat(document.querySelector(key).value);
    }


}