<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateWorkshopData extends FormRequest
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
            'title'             => 'required|min:10|max:100',
            'description'       => 'required|min:5|max:1000',
            'fileSource'      => 'required',
            'start_date'        => 'required',
            'closing_date'      => 'required',
            'start_time'        => 'required',
            'end_time'          => 'required',
            'state_id'          => 'required',
            'location'          => 'required',
        ];
    }
    
    public function messages()
    {
        return [
            'title.required'         => 'Title is required',
            'title.min'              => 'Atlease 5 characters required',
            'title.max'              => 'Maximum 100 characters allowed',
            'description.required'   => 'description is required',
            'description.min'        => 'Atlease 10 characters required',
            'description.max'        => 'Maximum 1000 characters allowed',
            'fileSource.required'  => 'Please select banner image',
            'start_date.required'    => 'Start Date is required',
            'closing_date.required'  => 'End Date is required',
            'start_time.required'    => 'Start time is required',
            'end_time.required'      => 'End time is required',
            'state_id.required'      => 'Please select state',
            'city_id.required'       => 'Please select city',
            'location.required'      => 'Please enter location',
        ];
    }
}
