var modalDialog = (function() {

  var methods = {};
  var Form = function() {

    this.instance = null;
    this.template = "<div class='formHeading'>{{ title }}</div><form class='formTemplate'><div class='formInputTemplate'>{{ inputs }}</div><div class='actionBar'><button type='submit' class='btn'>Ok</button><button type='reset' class='btn'>Cancel</button></div></form>";
  };
    Form.prototype.createInstance = function() {
      var form = document.createElement("div");
      form.setAttribute("class", "modalForm");
      document.body.appendChild(form);

      this.instance = form;
    }

    Form.prototype.renderStringInput = function(json) {
      stringInput = "<label>" + json.label + "</label><input class='formInput' type='text' value='" + json.value + "' required />";
      return stringInput
    }

    Form.prototype.renderIntegerInput = function(json) {
      integerInput = "<label>" + json.label + "</label><input class='formInput' type='number' value='" + json.value + "'  required />";
      return integerInput
    }

    Form.prototype.renderFloatInput = function(json) {
      floatInput = "<label>" + json.label + "</label><input class='formInput' type='number' step='any' value='" + json.value + "' required />";
      return floatInput
    }

    Form.prototype.render = function(json) {
      var self = this;

      if (!this.instance)
          this.createInstance();

      var html = this.template;
      html = html.replace("{{ title }}", json.title);

      // create some inputs
      var inputs = "";
      json.inputs.forEach(function(input) {
          switch(input.type) {
              case "float":
                inputs += self.renderFloatInput(input);
                break
              case "integer":
                inputs += self.renderIntegerInput(input);
                break
              case "string":
              default:
                inputs += self.renderStringInput(input);
                break;
          }
      })

      html = html.replace("{{ inputs }}", inputs);

      this.instance.innerHTML = html;
    }

    Form.prototype.destroy = function() {
      if (this.instance)
          document.body.removeChild(this.instance);
      
      this.instance = null;
    }

      methods.show = function(json) {
        var form  = new Form(); 
        form.render(json);
      }
  return methods
}());
