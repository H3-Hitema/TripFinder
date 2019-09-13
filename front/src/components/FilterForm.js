import React, { Component } from 'react';

import axios from 'axios';

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import mountain from '../assets/images/mountain.png'
import sea from '../assets/images/sea.png'
import culture from '../assets/images/culture.png'
import party from '../assets/images/party.png'
import sport from '../assets/images/sport.png'

const Range = Slider.Range

class FilterForm extends Component {
    state = {
        continents: [],
        continent: "",
        countries: [],
        country: "",
        type: "",
        minBudget: 10,
        maxBudget: 1000,
        minTemp: -10,
        maxTemp: 35,
    }

    componentDidMount() {
        this.getCountries()
        this.getContinents()
    }

    getCountries() {
        axios({
            method: "GET",
            url: "https://allwebsite.ovh/api/countries",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const countries = res.data

                    this.sortElements(countries)

                    this.setState({ countries })
                }
            })
    }

    getContinents() {
        axios({
            method: "GET",
            url: "https://allwebsite.ovh/api/continents",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    let continents = res.data

                    this.sortElements(continents)

                    this.setState({ continents })
                }
            })
    }

    sortElements = (array) => {
        array.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })

        return array
    }

    switchForm = (critere) => {
        const elemUL = document.querySelector('.ul_carousel');
        const elemLI = document.querySelector('.li_' + critere);
        const pos = parseInt(elemLI.getAttribute('data-position'));
        document.querySelector('.active').classList.remove('active');

        elemLI.classList.add('active');
        elemUL.style.transform = "translateX(-" + pos * elemLI.offsetWidth + "px)";
    }

    send = () => {
        document.querySelector('.btn_find').classList.add('clicked');

        const { minBudget, maxBudget, minTemp, maxTemp, country, continent, type } = this.state

        let URL_API = `https://e7fda28f.ngrok.io/api/search?minTmp=${minTemp}&maxTmp=${maxTemp}&minBudget=${minBudget}&maxBudget=${maxBudget}`

        if (country) URL_API += `&country=${country}`

        if (continent) URL_API += `&continent=${continent}`

        if (type) URL_API += `&type=${type}`

        console.log(URL_API)

        axios({
            method: "GET",
            url: URL_API,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                }
            })
    }

    handle = (e) => {
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name]: value
        })
    }

    handleType = (e) => {
        const value = e.target.name

        this.setState({
            type: value
        })
    }

    handleBudget = (value) => {
        this.setState({
            minBudget: value[0],
            maxBudget: value[1],
        })
    }

    handleTemp = (value) => {
        this.setState({
            minTemp: value[0],
            maxTemp: value[1],
        })
    }

    render() {
        return (
            <div>
                <div className="containerCarousel">
                    <div className="container_item">
                        <div onClick={() => this.switchForm("price")}>Prix</div>
                        <div onClick={() => this.switchForm("place")}>Lieux</div>
                        <div onClick={() => this.switchForm("temp")}>Température</div>
                        <div onClick={() => this.switchForm("type")}>Type de voyage</div>
                    </div>
                    <div className="carousel_wrapper">
                        <ul className="ul_carousel">
                            <li className="li_price active" data-position="0">
                                <Range defaultValue={[10, 1000]} min={10} max={1000} onChange={this.handleBudget} />
                                <p>{this.state.minBudget}€ -> {this.state.maxBudget}€</p>
                            </li>
                            <li className="li_place" data-position="1">
                                <select name="continent" onChange={this.handle}>
                                    <option value="">Sélectionner un continent</option>
                                    {this.state.continents.map(continent => (
                                        <option key={continent.id} value={continent.name}>
                                            {continent.name}
                                        </option>
                                    ))}
                                </select>
                                <select name="country" onChange={this.handle}>
                                    <option value="">Sélectionner un pays</option>
                                    {this.state.countries.map(country => (
                                        <option key={country.id} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li className="li_temp" data-position="2">
                                <Range defaultValue={[-10, 35]} min={-10} max={35} onChange={this.handleTemp} />
                                <p>{this.state.minTemp}°C -> {this.state.maxTemp}°C</p>
                            </li>
                            <li className="li_type" data-position="3">
                                <img className="img_type" src={mountain} name="montagne" alt="Montagne" onClick={this.handleType} />
                                <img className="img_type" src={sea} name="plage" alt="plage" onClick={this.handleType} />
                                <img className="img_type" src={culture} name="culture" alt="Culture" onClick={this.handleType} />
                                <img className="img_type" src={party} name="vie nocturne" alt="Vie nocturne" onClick={this.handleType} />
                                <img className="img_type" src={sport} name="sport" alt="Sport" onClick={this.handleType} />
                            </li>
                        </ul>
                    </div>
                </div>
                <button className="btn_find" onClick={this.send}>
                    <p>Rechercher</p>
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                        <path id="paper-plane-icon" d="M462,54.955L355.371,437.187l-135.92-128.842L353.388,167l-179.53,124.074L50,260.973L462,54.955z M202.992,332.528v124.517l58.738-67.927L202.992,332.528z"></path>
                    </svg>
                </button>
            </div>
        );
    }
}

export default FilterForm;