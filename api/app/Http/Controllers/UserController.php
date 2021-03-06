<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserController extends Controller
{
    public function show($id)
    {
        return User::find($id);
    }

    public function store(){
        $data = request()->validate([
            'email' => 'required|email|unique:users',
            'name'  => 'required|string|max:50',
            'password'  => 'required',
        ]);

        return User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
        ]);
    }

    public function update($id){
        $user = User::find($id);
        $res = request();

        $data = request()->validate([
            'email' =>  'email|unique:users',
            'name'  =>   'string|max:50',
        ]);

        if($res['name']){
             $user->name = $res->name;
        }
        if($res['email']){
            $user->email = $res->email;
        }

        $user->save();
        return $user;
    }

    public function destroy($id){
        $user = User::find($id);
        if($user){
            $user->delete();
            return response('User deleted', 201)
                  ->header('Content-Type', 'text/plain');
        }else{
            return response('User dosen\'t exist', 400)
                  ->header('Content-Type', 'text/plain');
        }
    }
}
