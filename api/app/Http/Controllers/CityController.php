<?php
/**
 * Created by PhpStorm.
 * User: gael
 * Date: 10/09/2019
 * Time: 14:47
 */

namespace App\Http\Controllers;


use App\City;

class CityController extends Controller
{
    public function show(City $city){
        return $city->toJson();
        // return json_encode(DB::table('City')->get($id));
    }
}