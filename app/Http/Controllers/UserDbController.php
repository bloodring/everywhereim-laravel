<?php

namespace App\Http\Controllers;

use App\User_db;
use App\color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserDbController extends Controller
{
    //Haal alle kleuren uit de DB
    public function index()
    {
        $users = User_db::all();
        return response()->json($users);
    }

    //Functie om een nieuwe kleur toe te voegen
    public function createColor(Request $request){
        $colorToAdd = new User_db;
        $colorToAdd->color=$request->color;
        $colorToAdd->save();
        return response(['Message' => 'Success'], 201);

        // $colorToAdd->color=$request->color;
        // $colorSend = User_db::create($colorToAdd);
        // return response()->json($colorSend, 201);
    }

    //Functie om de huidige kleur te updaten naar een nieuwe kleur
    public function updateColor(Request $request, $id){
        $user_db = User_db::findOrFail($request->id);
        $user_db->id = $request->id;
        $user_db->color = $request->color;
        $user_db->update();
        return response()->json($user_db, 200);
    }

    //Functie om de nieuwst gemaakte kleur binnen te halen
    public function getLatestColor(Request $request){
        ///$allColors = User_db::all();

        $latestAdded = DB::table('user_dbs')
                ->latest()->limit(1)
                ->get();

        //$latestColor = $allColors->orderByDesc('created_at');
        return response()->json($latestAdded);
    }

    //Functie om een kleur te verwijderen uit de DB
    public function deleteColor(Request $request){
        $toDelete = DB::table('user_dbs')->latest()->limit(1);
                
        $toDelete->delete();

        return response()->json(['Message' => 'Success'], 201);
    }

}


