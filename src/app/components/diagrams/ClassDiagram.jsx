import React, { useEffect, useState } from 'react'
import '../../App.css';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { Button, makeStyles, Modal } from '@material-ui/core';
import { connect } from 'react-redux';
import { getAllClass, getClassById  } from '../../actions/diagram'
import PropTypes from 'prop-types'
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

var diagram = 0
const $ = go.GraphObject.make;

function initDiagram() {
    diagram = 
        $(go.Diagram, 
            {
                "undoManager.isEnabled": true,
                'clickCreatingTool.archetypeNodeData': {
                    name: "Class",
                    properties: [],
                    methods: []
                  },
                model: $(go.GraphLinksModel,
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    })
            })
        function convertVisibility(v) {
          switch (v) {
            case "+": return "+";
            case "-": return "-";
            case "#": return "#";
            case "~": return "~";
            default: return '';
          }
        }

        var propertyTemplate = 
            $(go.Panel, 'Horizontal',
                $(go.TextBlock,
                    { isMultiline: false, editable: true, width: 12 },
                    new go.Binding('text', 'visibility', convertVisibility).makeTwoWay()),
                 $(go.TextBlock,
                   { isMultiline: false, editable: true },
                   new go.Binding("text", "name").makeTwoWay(),
                   new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })),
                 // property type, if known
                 $(go.TextBlock, "",
                   new go.Binding("text", "type", function (t) { return (t ? ": " : ""); })),
                 $(go.TextBlock,
                   { isMultiline: false, editable: true },
                   new go.Binding("text", "type").makeTwoWay()),
                 // property default value, if any
                 $(go.TextBlock,
                   { isMultiline: false, editable: false },
                   new go.Binding("text", "default", function (s) { return s ? " = " + s : ""; }))
            )

        var methodTemplate =
        $(go.Panel, "Horizontal",
          // method visibility/access
          $(go.TextBlock,
            { isMultiline: false, editable: true, width: 12 },
            new go.Binding("text", "visibility", convertVisibility).makeTwoWay()),
          // method name, underlined if scope=="class" to indicate static method
          $(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })),
          // method parameters
          $(go.TextBlock, "",
            // this does not permit adding/editing/removing of parameters via inplace edits
            new go.Binding("text", "parameters", function (parr) {
              var s = "";
              for (var i = 0; i < parr.length; i++) {
                var param = parr[i];
                if (i > 0) s += ", ";
                s += param.name + ": " + param.type;
              }
              return s + "";
            })),
          // method return type, if any
          $(go.TextBlock, "",
            new go.Binding("text", "type", function (t) { return (t ? ": " : ""); })),
          $(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "type").makeTwoWay())
        );

diagram.nodeTemplate =
        $(go.Node, "Auto", 
          {
            locationSpot: go.Spot.Center,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides,
          },
          $(go.Shape, { 
                        fill: "#52b69a",
                        portId: '',
                        fromLinkable: true,
                        toLinkable: true }),
          $(go.Panel, "Table",
            { defaultRowSeparatorStroke: "black", minSize: new go.Size(150, 150)},
            // header
            $(go.TextBlock,
              {
                row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                font: "bold 12pt sans-serif",
                isMultiline: false, editable: true,
              },
              new go.Binding("text", "name").makeTwoWay()),
            // properties
            $(go.TextBlock, "Properties",
              { row: 1, font: "italic 10pt sans-serif"},
              new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")),
            $(go.Panel, "Vertical", { name: "PROPERTIES" },
              new go.Binding("itemArray", "properties"),
              {
                row: 1, margin: 3, stretch: go.GraphObject.Fill,
                defaultAlignment: go.Spot.Left, background: "#52b69a",
                itemTemplate: propertyTemplate,
              }
            ),
            $("PanelExpanderButton", "PROPERTIES",
              { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
              new go.Binding("visible", "properties", function (arr) { return arr.length > 0; })),
            // methods
            $(go.TextBlock, "Methods",
              { row: 2, font: "italic 10pt sans-serif" },
              new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS")),
            $(go.Panel, "Vertical", { name: "METHODS" },
              new go.Binding("itemArray", "methods"),
              {
                row: 2, margin: 3, stretch: go.GraphObject.Fill,
                defaultAlignment: go.Spot.Left, background: "#52b69a",
                itemTemplate: methodTemplate
              }
            ),
            $("PanelExpanderButton", "METHODS",
              { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
              new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
          )
        );

      function convertIsTreeLink(r) {
        return r === "generalization";
      }

      function convertFromArrow(r) {
        switch (r) {
          case "generalization": return "";
          default: return "";
        }
      }

      function convertToArrow(r) {
        switch (r) {
          case "generalization": return "Triangle";
          case "aggregation": return "StretchedDiamond";
          default: return "";
        }
      }

      /*
      diagram.linkTemplate =
        $(go.Link,
          { routing: go.Link.Orthogonal,},
          new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
          $(go.Shape),
          $(go.Shape, { scale: 1.3, fill: "white" },
            new go.Binding("fromArrow", "relationship", convertFromArrow)),
          $(go.Shape, { scale: 1.3, fill: "white" },
            new go.Binding("toArrow", "relationship", convertToArrow))
        );

        */

        diagram.linkTemplateMap.add("",
            $(go.Link,
                new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
                $(go.Shape),
                $(go.Shape, {toArrow: "Triangle", scale: 1.3, fill: "white" },
                new go.Binding("fromArrow", "relationship", convertFromArrow)),
                $(go.Shape, {toArrow: "Triangle", scale: 1.3, fill: "white" },
                new go.Binding("toArrow", "relationship", convertToArrow))
            )
        )

      // setup a few example class nodes and relationships
      var nodedata = [
      
      ];
      var linkdata = [
       
      ];
      diagram.model = $(go.GraphLinksModel,
        {
          linkKeyProperty: 'key',
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray: nodedata,
          linkDataArray: linkdata,
        });
     
        btnGen()

      return diagram
}

function btnGen(){
    diagram.toolManager.linkingTool.archetypeLinkData = {relationship: 'generalization'}

    diagram.linkTemplateMap.add("",
        $(go.Link,
            {
                relinkableTo: true, 
                relinkableFrom: true,
                reshapable: true
            },
            $(go.Shape),
            $(go.Shape, { toArrow: "Triangle", fill: 'white', scale: 1.3})
        )
    )
}

function btnAgregat(){
    diagram.toolManager.linkingTool.archetypeLinkData = {relationship: 'aggregation'}

    diagram.linkTemplateMap.add("",
        $(go.Link,
            {
                relinkableTo: true, 
                relinkableFrom: true,
                reshapable: true
            },
            $(go.Shape),
            $(go.Shape, { fromArrow: "Diamond", fill: 'white', scale: 1.3})
        )
    )
}

function btnRemoveMethodOrProperty(){
    var n = diagram.selection.first()
    console.log(n.data.properties)
    
}



function handleModelChange(changes) {

    var n = diagram.selection.first()
    if(n===null) return

    if(n.data.properties !== null && n.data.properties !== undefined){
        for(let i = 0; i < n.data.properties.length; i++){
            if(n.data.properties[i].name === "" || n.data.properties[i].type === ""){
                diagram.startTransaction("removeFromTable");
                diagram.model.removeArrayItem(n.data.properties, i)
                diagram.commitTransaction("removeFromTable");
                console.log("Remove property")
            }
        }
    }
    if(n.data.methods !== null && n.data.methods !== undefined){
        for(let i = 0; i < n.data.methods.length; i++){
            if(n.data.methods[i].name === ""){
                diagram.startTransaction("removeFromTable");
                diagram.model.removeArrayItem(n.data.methods, i)
                diagram.commitTransaction("removeFromTable");
                console.log("Remove method")
            }
        }
    }
  }

  function btnAddProperty(){
    var n = diagram.selection.first()
    if(n===null || n.toString().includes("Link")) return console.log('btnAddProperty return')

    console.log(n.toString())
    
    let newProp = { name: "Name", type: "int", visibility: "+"}

    diagram.startTransaction("add");
    diagram.model.insertArrayItem(n.data.properties, 0, newProp)
    diagram.commitTransaction("removeFromTable");
    

  }

  function btnAddMethod(){
    var n = diagram.selection.first()
    if(n===null || n.toString().includes("Link")) return console.log('btnAddMethod return')

    let newMeth = { name: "methName()", type: "int", visibility: "+" }

    diagram.startTransaction("add");
    diagram.model.insertArrayItem(n.data.methods, 0, newMeth)
    diagram.commitTransaction("removeFromTable");
    
  }

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles({
  paper: {
        position: 'absolute',
        width: 600,
        height: 850,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        border: '2px solid #000',
        padding: '10px 20px',
        '& button': {
            marginTop: '20px'
        }
    },
})

function ClassDiagram({ getAllClass, getClassById, diagram: {singleClass} }) {
    const {id} = useParams()
    const pid = localStorage.getItem('id')
    const [jsonClass, setJsonClass] = useState('') 
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };


    useEffect(() => {
      getClassById(id)
    },[])
      

      function btnSave(){
      
      const det = `{"id":"${id}","title":"Moj neki Use Case", "projectId":${pid},`
      console.log(det)
      let tmp = diagram.model.toJson()
      console.log(tmp)
      try {
          var model = JSON.parse(det + tmp.substring(1, tmp.length))
           console.log(model)
      } catch (error) {
          console.log(error)
      }
      
     
      axios.put("https://si-class.herokuapp.com/regular", model, {
        headers: {'x-auth': `${localStorage.getItem('token')}`}
      })
    }
   
     function loadData() {
      let data = singleClass.result
      let tmp = diagram.model
      tmp = go.Model.fromJson(data)
      diagram.model = tmp
    }

    function convert() {
      const det = `{"id":"${id}","title":"Moj neki Use Case", "projectId":${pid},`
      let tmp = diagram.model.toJson()
     
      try {
          var model = JSON.parse(det + tmp.substring(1, tmp.length))
           
      } catch (error) {
          console.log(error)
      }
      
     
      axios.put("https://si-class.herokuapp.com/regular", model, {
        headers: {'x-auth': `${localStorage.getItem('token')}`}
      }).then(res => {
        if(res.status === 200) {
          axios.post('https://si-class-to-java.herokuapp.com/team-leader/class-to-java',model )
          .then(res=> {
            setJsonClass(res.data.result)
            setOpen(true)
            return
          })
          .catch(err => console.log(err))
        }
      })

    }
  
    
    return (
        <div id="div" className="diagram-wrapper">
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper}>
                {jsonClass}
              </div>
            </Modal>
          <div className="diagram-sideBar">
            <Button variant="outlined" color='primary' id="btnGen" onClick={btnGen}>Generalization</Button>
            <Button variant="outlined" color='primary' id="btnAgregat" onClick={btnAgregat}>Aggregation</Button>
            <Button variant="outlined" color='primary' id="btnAddProperty" onClick={btnAddProperty}>Add Property</Button>
            <Button variant="outlined" color='primary' id="btnAddMethod" onClick={btnAddMethod}>Add Method</Button>
            <Button variant="contained" id="load" onClick = {loadData}>Load</Button>
            <Button variant="contained" color='secondary' id="save" onClick = {btnSave}>Save</Button>
            <Button variant="contained" color='secondary' id="save" onClick = {convert}>Convert</Button>
          </div>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName="diagram-component"
                onModelChange={handleModelChange}
            />
          

        </div>
    )
}

ClassDiagram.propTypes = {
    getAllClass: PropTypes.func.isRequired,
    getClassById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  class: state.class,
  auth: state.auth,
  diagram: state.diagram
})

export default connect(mapStateToProps, { getAllClass, getClassById })(ClassDiagram)