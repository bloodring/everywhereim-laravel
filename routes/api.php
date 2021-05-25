<?php

use App\Http\Controllers\UserDbController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\color;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('users', 'UserDbController@index');
Route::post('users', 'UserDbController@createColor');
Route::put('users/{id}','UserDbController@updateColor');

Route::get('users/latest', 'UserDBController@getLatestColor');
Route::delete('users/delete', 'userDBController@deleteColor');
Route::delete('users/delete2', 'userDBController@deleteColor');

