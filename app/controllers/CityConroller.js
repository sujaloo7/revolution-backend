const Controller = require("./Controller");
const ObjectID = require("mongodb").ObjectID;
const Model = require("../models/model");
const City = require("../models/CitySchema").City;
const Globals = require("../../configs/globals");
const Agreegate = require("../models/Aggregations");
// const State = require("../models/StateSchema").State;

class CityController extends Controller {
  constructor() {
    super();
  }

  async AddCity() {
    try {
      let citydata = this.req.body;
      let city = await new Model(City).store(citydata);
      if (city != null) {
        this.res.send({ status: 1, message: "city added successfully" });
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add city api",
        function_name: "AddCity()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async GetCity() {
    try {
      if (this.req.body.city_id) {
        let city = await City.findOne({
          _id: ObjectID(this.req.body.city_id),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        if (city != null) {
          this.res.send({
            status: 1,
            message: "single city returned successfully",
            data: city,
          });
        }
      } else if (this.req.body.state_id) {
        let stateID = ObjectID(this.req.body.state_id);
        let cities = await City.find({
          state_id: ObjectID(stateID),
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        });
        this.res.send({
          status: 1,
          message: "city according to states returned",
          data: cities,
        });
      } else {
        const filter = {
          delete_status: false,
          app_id: ObjectID(this.req.body.app_id),
        };
        let city = await new Agreegate(City).getCity(filter);
        console.log(city);
        if (city != null) {
          this.res.send({
            status: 1,
            message: "all city returned successfully",
            data: city,
          });
        }
      }
    } catch (error) {
      this.res.send({
        status: 0,
        message: "some error occured..please try again after some time",
      });
      console.log(error);
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "add city api",
        function_name: "AddCity()",
        error_title: "error.name",
        description: "error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }

  async UpdateCity() {
    try {
      if (!this.req.body.delete_status) {
        let updateData = this.req.body;
        let updateCity = await City.findByIdAndUpdate(
          ObjectID(this.req.body.city_id),
          updateData
        );
        console.log(updateCity);
        if (updateCity != null) {
          this.res.send({ status: 1, message: "city updated successfully" });
        }
      } else {
        let dData = this.req.body;
        let deletCity = await City.findByIdAndUpdate(
          ObjectID(this.req.body.city_id),
          dData
        );
        console.log(deletCity);
        if (deletCity != null) {
          this.res.send({ status: 1, message: "city deleted successfully" });
        }
      }
    } catch (error) {
      let globalObj = new Globals();
      let dataErrorObj = {
        is_from: "API Error",
        api_name: "update city api",
        function_name: "UpdateCity()",
        error_title: " error.name",
        descriprion: " error.message",
      };
      globalObj.addErrorLogInDB(dataErrorObj);
    }
  }
}
module.exports = CityController;
