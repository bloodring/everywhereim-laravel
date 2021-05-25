<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\color;

class colorController extends Controller
{
    public function createColor(Request $request){
        $colorToAdd = new color;
        $colorToAdd->color=$request->color;
        $result=$colorToAdd->save();
    }
}
