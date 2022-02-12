import React from "react";
import msypro from "../../assets/msypro.jpeg";

const Profile = () => {
  return (
    <div className="content">
      <div className="profile">
        <div className="first">
          <img src={msypro} alt="msypro" />
        </div>
        <div className="second">
          <h1 className="title">Mouhamed</h1>
          <p className="biogra">Soyez présent partout et visible nulle part</p>
        </div>
        <div className="third">
          <p>
            <span>29</span>abonnés
          </p>
          <p>
            <span>17</span>Abonnements
          </p>
        </div>
        <div className="fourth">
          <div className="fourth__first">
            <p>science</p>
            <p>sport</p>
            <p>tech</p>
          </div>
          <div className="fourth__second">
            <p>music</p>
            <p>voyage</p>
            <p>art</p>
          </div>
        </div>
      </div>
      <div className="bas">
        <h3>centre d'interets</h3>
        <div>
          <div>
            <p>football</p>
            <p>basketball</p>
            <p>gaming</p>
          </div>
          <div>
            <p>informatique</p>
            <p>Tech</p>
            <p>science</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
