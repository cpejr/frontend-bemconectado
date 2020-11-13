import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

import { LoginContext } from "../../../contexts/LoginContext";
import { useToasts } from "react-toast-notifications";
import api from "../../../services/api";

export default function EditImage({ curUser, setData, setUpdate}) {
    const [imageId, setImageId] = useState(
      curUser && curUser.imageSrc
        ? `https://drive.google.com/uc?id=${curUser.imageSrc}`
        : "/images/logoFinal.png"
    );
  
    const [imageName, setImageName] = useState("Nome do arquivo");
    const [imageFile, setImageFile] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { token, signIn } = useContext(LoginContext);
    const { addToast } = useToasts();
  
    function handleSetImage(imageId, imageName, imageFile, setData) {
      setImageId(imageId);
      setImageName(imageName);
      setImageFile(imageFile);
      setIsNew(true);
    }
  
    function handleReset() {
      setImageId(curUser.imageId);
      setImageName("Nome do arquivo");
      setImageFile(null);
      setIsNew(false);
    }
  
    async function handleSubmit() {
      let body = new FormData();
      setLoading(true);
  
      try {
        function addToData(key, value) {
          if (value !== undefined && value !== "") {
            body.append(key, value);
          }
        }
  
        if (imageFile !== null) {
          addToData("imageFile", imageFile);
          const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          };
          const response = await api.put(`/ong/${curUser._id}`, body, config);
  
          const { accessToken, user } = response.data;
  
          if (accessToken !== undefined && user !== undefined) {
            signIn(accessToken, user);
            setData({ ...user });
          }
  
          setLoading(false);
          addToast("Imagem atualizada com sucesso!", { appearance: "success" });
          setIsNew(false);
        } else {
          addToast("Imagem não foi selecionada!", { appearance: "error" });
        }
      } catch (error) {
        console.warn(error);
        addToast("Erro no upload da imagem!", { appearance: "error" });
        setLoading(false);
        setIsNew(false);
      }
    }
  
    function handleImage(event) {
      const newImageName = event.target.files[0]
        ? event.target.files[0].name
        : "Erro no upload!";
        
      const imageFile = event.target.files[0] ? event.target.files[0] : null;
      let img_urls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      Array.from(event.target.files).map((file) => URL.revokeObjectURL(file));
  
      const newImageId = img_urls[0] ? img_urls[0] : null;
  
      newImageId && handleSetImage(newImageId, newImageName, imageFile);
    }
  
    return (
      <div className="EditImageContainer">
        <p className="mb-1">
          Pré-visualização no cartão exibido na Página inicial:
        </p>
        <div
          className={
            isNew ? "border border-success userImgContainer" : "userImgContainer"
          }
        >
          <img src={imageId} className="userImg" alt="preview" />
        </div>
        <Form className="mt-3">
            <Button size="sm" className="mt-3" onClick={(e) => handleReset()}>
            {loading ? (
                <ClipLoader size={30} color={"#000"} loading={true} />
            ) : (
                "Voltar imagem"
            )}
            </Button>
          <Form.File
            id="custom-file"
            label={imageName}
            custom
            data-browse="Escolha o arquivo"
            accept="image/x-png,image/jpeg"
            onChange={(e) => handleImage(e)}
          />
          <Form.Text muted>
            É recomendado um arquivo com resolução de 320x140
          </Form.Text>
        </Form>
        <Button size="sm" className="mt-3" onClick={(e) => handleSubmit()}>
          {loading ? (
            <ClipLoader size={30} color={"#000"} loading={true} />
          ) : (
            "Alterar imagem"
          )}
        </Button>
      </div>
    );
  }