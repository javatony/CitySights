class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :city, null: false
      t.float :longitude, null: false
      t.float :latitude, null: false

      t.timestamp null: false

    end
  end
end
