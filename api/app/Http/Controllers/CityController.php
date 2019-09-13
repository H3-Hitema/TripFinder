<?php
/**
 * Created by PhpStorm.
 * User: gael
 * Date: 10/09/2019
 * Time: 14:47
 */

namespace App\Http\Controllers;

use App\Http\Resources\CityCollection;
use App\Http\Resources\CityResource;
use App\City;

class CityController extends Controller
{
    public function show(City $city){
        return new CityResource($city);;
    }

    public function index()
    {
        return CityResource::collection(City::all());
    }

    public function search()
    {
        $res = request();
        $cities = CityResource::collection(City::all());

        if (count($_GET) != 0) {
            if ($res->minTmp && $res->maxTmp) {
                $cities = $cities->whereBetween('temperature', [$res->minTmp, $res->maxTmp]);
            }

            if ($res->minBudget && $res->maxBudget) {
                $cities = $cities->whereBetween('budget', [$res->minBudget, $res->maxBudget]);
            }

            if ($res->country) {
                $cities = $cities->filter(function($city, $key) use($res) {
                    return $city->country->name == $res->country;
                });
            }

            if ($res->continent) {
                $cities = $cities->filter(function($city, $key) use($res) {
                    return $city->country->continent->name == $res->continent;
                });
            }

            if ($res->type) {
                $cities = $cities->filter(function($city, $key) use($res) {
                    return $city->types->some(function($type, $key) use ($res) {
                        return $type->name == $res->type;
                    });
                });
            }

            return  $cities->flatten();
        }
        return $cities;
    }
}