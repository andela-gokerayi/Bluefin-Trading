var modalDialog = (function() {

  var methods = {}
  var form = new function() {

    this.instance = null;
    this.template = "<div class='formHeading'>{{ title }}</div><form class='formTemplate'><div class='formInputTemplate'>{{ inputs }}</div><div class='actionBar'><button type='submit' class='btn'>Ok</button><button type='reset' class='btn'>Cancel</button></div></form>";

    this.createInstance = function() {
      var form = document.createElement("div");
      form.setAttribute("class", "modalForm");
      document.body.appendChild(form);

      this.instance = form;
    }

    this.renderStringInput = function(json) {
      stringInput = "<label>" + json.label + "</label><input class='formInput' type='text' value='" + json.value + "' required />";
      return stringInput
    }

    this.renderIntegerInput = function(json) {
      integerInput = "<label>" + json.label + "</label><input class='formInput' type='number' value='" + json.value + "'  required />";
      return integerInput
    }

    this.renderFloatInput = function(json) {
      floatInput = "<label>" + json.label + "</label><input class='formInput' type='number' step='any' value='" + json.value + "' required />";
      return floatInput
    }

    this.render = function(json) {

      if (!this.instance)
          this.createInstance();

      var html = this.template;
      html = html.replace("{{ title }}", json.title);

      // create some inputs
      var inputs = "";
      json.inputs.forEach(function(input) {
          switch(input.type) {
              case "float":
                inputs += form.renderFloatInput(input);
                break
              case "integer":
                inputs += form.renderIntegerInput(input);
                break
              case "string":
              default:
                inputs += form.renderStringInput(input);
                break;
          }
          console.log(inputs)
      })

      html = html.replace("{{ inputs }}", inputs);

      this.instance.innerHTML = html;
    }

    this.destroy = function() {
      if (this.instance)
          document.body.removeChild(this.instance);
      
      this.instance = null;
    }

      methods.show = function(json) {

        form.render(json);
      }
  }
  return methods
}());
