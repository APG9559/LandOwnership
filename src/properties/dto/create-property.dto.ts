/* eslint-disable prettier/prettier */
export class CreatePropertyDto {
  village_id: number;
  property_ref_code: string;
  land_type_id: number;

  survey_number?: string;
  sub_division?: string;
  plot_number?: string;

  total_area_sqmt?: number;
  guideline_value?: number;
  market_value?: number;
}