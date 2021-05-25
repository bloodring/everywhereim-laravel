<?php

use App\User_db;
use Illuminate\Database\Seeder;

class UserDbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        user_db::create([
            "Color" => "#800000"
        ]);

        user_db::create([
            "Color" => "#FF0000"
        ]);
    }
}
