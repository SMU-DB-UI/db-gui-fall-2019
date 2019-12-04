/* jshint expr: true */

export class employee {
    // constructor(fname, lname, address, phone){

    //     this.id = "",
    //     this.fname = fname;
    //     this.lname = lname;
    //     this.dep_id = "",
    //     this.position = "",
    //     this.manager = "",
    //     this.address = address;
    //     this.phone = phone;
    //     this.rating = "",
    //     this.strikes = "",
    //     this.active = ""
    // }

    constructor(id, fname, lname, dep_id, position, manager, address, phone, rating, strikes, active){
        
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.dep_id = dep_id;
        this.position = position;
        this.manager = manager;
        this.address = address;
        this.phone = phone;
        this.rating = rating;
        this.strikes = strikes;
        this.active = active;
    }

}