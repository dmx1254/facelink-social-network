import React from "react";

const Publication = ({ publi }) => {
  const convertDate = (dateToConvert) => {
    const date = new Date(dateToConvert).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return date;
  };

  return (
    <div className="publication">
      {publi.video ? (
        <iframe
          src={publi.video}
          framerborder="0"
          allow="accelerometer; autoplay clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={publi.video}
        ></iframe>
      ) : publi.picture ? (
        <img src={publi && publi.picture} alt="singlePubli" />
      ) : null}
      <div className="single__publi">
        <p>autheur: {publi.posterPseudo}</p>
        <p>Date publiée: {convertDate(publi.createdAt)}</p>
      </div>
    </div>
  );
};

export default Publication;
