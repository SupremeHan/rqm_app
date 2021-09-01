import '../../App.css';
import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import { Button } from '@material-ui/core';
import { getUseCaseById } from '../../actions/diagram'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

var diagram = 0
const $ = go.GraphObject.make;

function initDiagram() {
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

    diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  // must be set to allow for model change listening
          // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
          model: $(go.GraphLinksModel,
            {
              linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            })
        });

    diagram.nodeTemplateMap.add("UseCase",
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        
        {
          minSize: new go.Size(70, 35)
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Ellipse',
          { name: 'SHAPE', fill: '#52b69a', portId: '', strokeWidth: 0, fromLinkable: true, toLinkable: true},),
          $(go.Panel, "Auto", {alignment: go.Spot.Center},
            $(go.TextBlock, "Use Case",
            { margin: 6, editable: true },
            new go.Binding("text").makeTwoWay())
          )
       )   
    )

    diagram.nodeTemplateMap.add("Actor",
      $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Picture, '../stick.png',
          { desiredSize: new go.Size(70,70), name: 'SHAPE', portId: '', fromLinkable: true, toLinkable: true},
          ),
          $(go.Panel, "Auto", {alignment: go.Spot.Center},
            $(go.TextBlock, "Actor",
            { margin: 6, editable: true, desiredSize: new go.Size(70,70)},
            new go.Binding("text").makeTwoWay())
          )
      )
    )

    diagram.linkTemplateMap.add("include",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,
        },
        $(go.Shape, 
          {
            strokeDashArray: [5,3]
          }),
        $(go.Shape, {toArrow: "Standard"}),
        $(go.TextBlock, "include", {segmentOffset: new go.Point(7,23)}) 
      )
    )

    diagram.linkTemplateMap.add("extend",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,
        },
        $(go.Shape, 
          {
            strokeDashArray: [5,3]
          }),
        $(go.Shape, {toArrow: "Standard"}),
        $(go.TextBlock, "extend", {segmentOffset: new go.Point(7,23)}) 
      )
    )

    diagram.linkTemplateMap.add("gen",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,

        },
        $(go.Shape),
        $(go.Shape, { toArrow: "Triangle", fill: 'white', scale: 1.3})
      )
    )

    diagram.linkTemplateMap.add("ass",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,

        },
        $(go.Shape)
      )
    )

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    diagram.toolManager.relinkingTool.linkValidation = function(fromnode, fromport, tonode, toport, link){
      if(fromnode.data.category === "Use-case" && tonode.data.category === "Use-case" && link.data.category === "gen"){
        return null
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    diagram.model = 
    $(go.GraphLinksModel, 
      {
        linkKeyProperty: 'key',
        nodeDataArray:
        [
          
        ],
        linkDataArray:
        [
         
        ]
      });


    btnUseCase() 

    return diagram;
  }



  function handleModelChange(changes) {
    console.log('it changed')
  }

  function btnActor(){

      diagram.toolManager.clickCreatingTool.archetypeNodeData = { text: 'Actor', category: 'Actor' }

       diagram.nodeTemplateMap.add("",
       $(go.Node, 'Auto',  // the Shape will go around the TextBlock
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Picture, './stick.png',
          { desiredSize: new go.Size(70,70), name: 'SHAPE', portId: '', fromLinkable: true, toLinkable: true},
          ),
          $(go.Panel, "Auto", {alignment: go.Spot.Center},
            $(go.TextBlock, "Actor",
            { margin: 6, editable: true, desiredSize: new go.Size(70,70)},
            new go.Binding("text").makeTwoWay())
          )
      )
     )

  }


  function btnUseCase(){

    diagram.toolManager.clickCreatingTool.archetypeNodeData = { text: 'Use Case', category: 'UseCase' }

    diagram.nodeTemplateMap.add("",
    $(go.Node, 'Auto',
      $(go.Shape, 'Ellipse',
        { name: 'SHAPE', fill: 'DarkTurquoise', portId: '', strokeWidth: 0, fromLinkable: true, toLinkable: true},),
        $(go.Panel, "Auto", {alignment: go.Spot.Center},
          $(go.TextBlock, "Use Case",
            { margin: 6, editable: true },
            new go.Binding("text").makeTwoWay())
        )
    )   
  )
}

  function btnExtend(){

    diagram.toolManager.linkingTool.archetypeLinkData = {category: 'extend'}

    diagram.linkTemplateMap.add("",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,
          routing: go.Link.AvoidsNodes,
          reshapable: true
        },
        $(go.Shape, 
          {
            strokeDashArray: [5,3]
          }),
        $(go.Shape, {toArrow: "Standard"}),
        $(go.TextBlock, "extend", {segmentOffset: new go.Point(7,23)}) 
      )
    )
  }

  function btnInclude(){

    diagram.toolManager.linkingTool.archetypeLinkData = {category: 'include'}

    diagram.linkTemplateMap.add("",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,
          routing: go.Link.AvoidsNodes,
          reshapable: true
        },
        $(go.Shape, 
          {
            strokeDashArray: [5,3]
          }),
        $(go.Shape, {toArrow: "Standard"}),
        $(go.TextBlock, "include", {segmentOffset: new go.Point(7,23)}) 
      )
    )
  }

  function btnGen(){

    diagram.toolManager.linkingTool.archetypeLinkData = {category: 'gen'}

    diagram.linkTemplateMap.add("",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,

        },
        $(go.Shape),
        $(go.Shape, { toArrow: "Triangle", fill: 'white', scale: 1.3})
      )
    )
  }

  function btnAssociation(){
    diagram.toolManager.linkingTool.archetypeLinkData = {category: 'ass'}

    diagram.linkTemplateMap.add("",
      $(go.Link, 
        {
          relinkableTo: true, 
          relinkableFrom: true,

        },
        $(go.Shape)
      )
    )
  }

  

function UseCase({ getUseCaseById, diagram: {singleCase, convertedRqm}}) {
  const {id} = useParams()

  useEffect(() => {
    getUseCaseById(id)
  },[])

  function btnSave(){
    const det = `{"id":"${id}","title":"Moj neki Use Case", "projectId":1,`
      console.log(det)
      let tmp = diagram.model.toJson()
      console.log(tmp)
      try {
          var model = JSON.parse(det + tmp.substring(1, tmp.length))
           console.log(model)
      } catch (error) {
          console.log(error)
      }
      
     
      axios.put("https://si-use-case.herokuapp.com/regular", model, {
        headers: {'x-auth': `${localStorage.getItem('token')}`}
      })
  }


  function loadData() {
      let data = singleCase.result
      let tmp = diagram.model
      tmp = go.Model.fromJson(data)
      diagram.model = tmp
    }
    
    function loadCovert() {
      let data = JSON.stringify(convertedRqm.result)
      let tmp = diagram.model
      tmp = go.Model.fromJson(data)
      diagram.model = tmp
    }

  return (
    <div className="diagram-wrapper">
      <div className="diagram-sideBar">
          <Button variant="outlined" color='primary' id="btnActor" onClick={btnActor}>Actor</Button>
        <Button variant="outlined" color='primary' id="btnUseCase" onClick={btnUseCase}>Use case</Button>
        <Button variant="outlined" color='primary' id="btnExtend" onClick = {btnExtend}>Extend</Button>
        <Button variant="outlined" color='primary' id="btnInclude" onClick = {btnInclude}>Include</Button>
        <Button variant="outlined" color='primary' id="btnInclude" onClick = {btnGen}>Generalisation</Button>
        <Button variant="outlined" color='primary' id="btnAssociation" onClick = {btnAssociation}>Association</Button>
        <Button variant="contained" id="load" onClick = {loadData}>Load</Button>
        <Button variant="contained" color='secondary' id="save" onClick = {btnSave}>Save</Button>
        <Button variant="contained" color='secondary'  onClick = {loadCovert}>Convert</Button>
      </div>
      <ReactDiagram
          initDiagram={initDiagram}
          divClassName='diagram-component'
          onModelChange={handleModelChange}
        />
        

    </div>
  );
}

const mapStateToProps = state => ({
  diagram: state.diagram
})

export default connect(mapStateToProps, {getUseCaseById})(UseCase)
