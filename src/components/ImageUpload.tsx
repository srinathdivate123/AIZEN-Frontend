import React, { Component } from "react";
import axios from "axios";
import { useStore } from "@/store/store";
import { toast } from "@/hooks/use-toast";


interface ImageUploadState {
  image: File[];
  responseMsg: {
    status: string;
    message: string;
    error: string;
  };

};

export default class ImageUpload extends Component<{}, ImageUploadState> {
  
  constructor(props: {}) {
    super(props);

    this.state = {
      image: [] as File[],
      responseMsg: {
        status: "",
        message: "",
        error: "",
      },
    };
  }

  // image onchange hander
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imagesArray: File[] = [];

      for (let i = 0; i < e.target.files.length; i++) {
        if (this.fileValidate(e.target.files[i])) {
          imagesArray.push(e.target.files[i]);
        }
      }

      this.setState({
        image: imagesArray,
      });
    }
  };


  // submit handler
  submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const data = new FormData();

    

    this.state.image.forEach((file) => {
    data.append("files[]", file); // No need for `[]` unless backend expects an array
  });

    const accessToken = useStore.getState().accessToken;
    



    axios.post("https://aizen-backend.onrender.com/dashboard/images", data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {

        console.log(response)

        if (response.status === 201) {
          toast({
            title: "Success",
            description: "Image uploaded successfully",
            variant: "success",
          });
          this.setState({
            responseMsg: {
              status: response.data.status,
              message: response.data.message,
              error: "",
            },
          });
          setTimeout(() => {
            this.setState({
              image: [],
              responseMsg: {
                status: "",
                message: "",
                error: "",
              },
            });
          }, 100000);

          (document.querySelector("#imageForm") as HTMLFormElement)?.reset();

          // getting uploaded images
        }
        
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 401) {
            alert("There was an error!");
          }
        }
      });

  };

  // file validation
  fileValidate = (file: { type: string; }) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      this.setState({
        responseMsg: {
          status: "",
          message: "",
          error: "",
        },
      });
      return true;
    } else {
      this.setState({
        responseMsg: {
          status: "",
          message: "",
          error: "File type not allowed",
        },
      });
      return false;
    }
  };

  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
              <div className="card shadow">

                {this.state.responseMsg.status === "successs" ? (
                  <div className="alert alert-success">
                    {this.state.responseMsg.message}
                  </div>
                ) : this.state.responseMsg.status === "failed" ? (
                  <div className="alert alert-danger">
                    {this.state.responseMsg.message}
                  </div>
                ) : (
                  ""
                )}

                <div className="card-body">
                  <div className="form-group py-2">
                    <label htmlFor="images"></label>
                    <input
                      type="file"
                      name="image"
                      multiple
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.responseMsg.error}
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  <button type="submit" className="btn btn-success">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}