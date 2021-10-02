<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateUserAppliedCasting extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
//            'name'          => 'required',
//            'age'           => 'required',
//            'height'        =>  'required',
//            'phone'         =>  'required',
//            'language_id'   =>  'required',
//            'select_city'   =>  'required',
//            'home_town'     =>  'required',
//            'hobbies'       =>  'required',
            // 'fileSource'       =>  'required',
//            'image_2'       =>  'required',
//            'image_3'       =>  'required',
//            'video_1'       =>  'required',
            'casting_id'    =>  'required',
            
        ];
    }
    
    
        public function messages()
    {
        return [
//            'name.required'                 => 'Name field is required.',
//            'age.required'                  => 'Age field  is required.',
//            'height.required'                => 'Height field is required.',
//            'phone.required'                 => 'Phone field  is required.', 
//            'language_id.required'              => 'language field is required.',
//            'select_city.required'                  => 'city field is required.',
//            'home_town.required'            => 'Home town field is required.',
//            'hobbies.required'           => 'Hobbies field is required.',
            //  'fileSource'       =>  'Image is required',
//            'image_2'       =>  'Image is required',
//            'image_3'       =>  'Image is required',
//            'video_1'       =>  'Video is required',
            'casting_id'    =>  'casting id required',
            
            ];
    }
}
