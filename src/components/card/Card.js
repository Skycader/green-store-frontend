import Style from "./card.module.css"

const Card = (props) => {
  return (
      <div className={Style.card + " card waves-effect waves-light"}>
        <div className="card-image">
        
          <img src={props.img}></img>
          <span className="card-title"><span className={Style.cardTitle}>{props.name}</span></span>
          <a onClick={()=>alert(props.name)}className={Style.addButton + " btn-floating halfway-fab waves-effect green"}><i className={Style.add + " material-icons"}>add</i></a>
        </div>
        

        <div style={{display: "flex"}} className="card-content">
        <a className="waves-effect waves-light btn-small">${props.price}</a>
        <span style={{marginLeft: 10}}>{props.description}</span>  
        <div style={{marginLeft: "auto"}}>
          {/* <input style={{textAlign: "center", width: "50px"}}></input> */}
        </div>
        </div>
      </div>
           
  )
}

export default Card