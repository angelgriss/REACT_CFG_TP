import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estados: [],
      ciudades:[],
      barrios:[],
      ciudadsel:'',
      barriosel:'',
    };

    this.obtenerCiudades = this.obtenerCiudades.bind(this)
    this.obtenerBarrios = this.obtenerBarrios.bind(this)
  }

  componentDidMount() {

      var req = new XMLHttpRequest();
      req.open('GET', 'http://localhost:8081/states', false); 
      req.send(null);

      var est = JSON.parse(req.response);

      this.setState({ estados: est });
  }

  obtenerCiudades(e){

      var req = new XMLHttpRequest();
      req.open('GET','http://localhost:8081/cities/'+ e.target.id, false); 
      req.send(null);

      var cit = JSON.parse(req.response);
      this.setState({ ciudades:cit, ciudadsel: e.target.id});
          
  }

  obtenerBarrios(e){

    var req = new XMLHttpRequest();
    req.open('GET','http://localhost:8081/neighborhoods/'+ e.target.id, false); 
    req.send(null);

    var bar = JSON.parse(req.response);
    this.setState({ barrios:bar, barriosel: e.target.id});
        
}

  renderciudades(id){

    var divStyle = {
        color: 'red'
      };

      if(this.state.ciudadsel==id)
      {
        return(
            this.state.ciudades.map(city =>
                <div key={city.id} id={city.id}>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    <button id={city.id} style={divStyle} onClick={this.obtenerBarrios}>{city.name}</button>
                    {this.renderbarrios(city.id)}
                </div>
            ));
      }
      else
      {
          return null;
      }
  }

  renderbarrios(id){
    
    var divStyle = {
        color: 'green'
      };
    
    if(this.state.barriosel==id)
    {
      return(
          this.state.barrios.map(barr =>
              <div key={barr.id} id={barr.id}>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <button id={barr.id} style={divStyle} onClick={this.obtenerBarrios}>{barr.name}</button>
                          
              </div>
          ));
    }
    else
    {
        return null;
    }
}

render() {

    return (
      <div>
        {
            this.state.estados.map(est =>
                <div key={est.id} id={est.id}>
            
                    <button id={est.id} onClick={this.obtenerCiudades}>{est.name}</button>
                    {this.renderciudades(est.id)}
                
                </div>
            
            )}
        
      </div>
    );
  }
}


export default App;