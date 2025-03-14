import React, { Component } from "react";
import axios from "axios";
import { useStore } from "@/store/store";

export default class Images extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: [],
        };
    }

    componentDidMount() {
        this.getImages();
    }


    getImages = () => {
        const accessToken = useStore.getState().accessToken;
        console.log(accessToken);

        axios.get("http://127.0.0.1:5000/dashboard/images",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(async (response) => {
                console.log(response.data.paths);

                const imageFiles: string[] = response.data.paths;
                console.log(imageFiles, imageFiles);
                
                

                if (response.status === 200) {
                    this.setState({
                        title: imageFiles,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <div className="container pt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="row">

                                    {
                                        this.state.title.length > 0 ? (
                                            this.state.title.map((image) => (
                                                <div className="col-lg-3" key={image.id}>
                                                    <img src={image} className="img-fluid img-bordered" width="400px" style={{ padding: "30px" }} 
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <h6 className="text-danger text-center">Fetching Images </h6>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}