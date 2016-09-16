# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Item.destroy_all
Subtype.destroy_all
Type.destroy_all
Division.destroy_all


u1 = User.create!({name: 'Chris', code: 1111})
u2 = User.create!({name:'Renwick', code: 2222})
u3 = User.create!({name:'Russell', code: 3333})
u4 = User.create!({name:'Sam', code: 4444})

d1= Division.create!({name: "Food"})
d2= Division.create!({name: "Drink"})

t1= Type.create!({name:'Beer/Other', division_id:d2.id})
t2= Type.create!({name:'Wine', division_id:d2.id})
t6= Type.create!({name:'Mains', division_id:d1.id})

sT1= Subtype.create!({name: 'Red Wine', type_id: t2.id})
sT2= Subtype.create!({name: 'White Wine', type_id: t2.id})
sT5= Subtype.create!({name: 'Draught Beer', type_id: t1.id})
sT6= Subtype.create!({name: 'Packaged Beer', type_id: t1.id})
sT7= Subtype.create!({name: 'Grill', type_id: t6.id})
sT8= Subtype.create!({name: 'Salads', type_id: t6.id})


i1 = Item.create({
name: 'Merlot', 
subtype_id: sT1.id,
sizes:'["125ml","175ml","750ml"]', 
prices:'[3.00,4.50,18.00]',
})

i2 = Item.create({
name: 'Primitivo' , 
subtype_id: sT1.id, 
sizes:'["125ml","175ml","750ml"]', 
prices:'[3.50,5.00,20.00]',
})

i3 = Item.create({
name: 'Pinot Grigio' , 
subtype_id: sT8.id, 
sizes:'["125ml","175ml","750ml"]', 
prices: '[3.00,4.50,18.00]',
})
i4 = Item.create({
name: 'Chenin Blanc' , 
subtype_id: sT8.id, 
sizes:'["125ml","175ml","750ml"]', 
prices:'[3.50,5.00,20.00]',
})

i5 = Item.create({
name: 'Red Stripe' , 
subtype_id: sT8.id, 
sizes:'["half","pint"]', 
prices:'[2.00,4.00]',
})

i6 = Item.create({
name: 'Guinness' , 
subtype_id: sT8.id, 
sizes:'["half","pint"]', 
prices:'[2.40,4.80]',
})

i7 = Item.create({name: 'Btl Pacifico' , 
subtype_id: sT8.id, 
sizes:'["330ml"]', 
prices:'[3.60]',
})

i8 = Item.create({name: 'Btl Gladeye' , 
subtype_id: sT6.id, 
sizes:'["500ml"]', 
prices:'[4.80]',
})

i9 = Item.create({name: 'Steak' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[18.80]',
})

i10 = Item.create({name: 'Grilled Chicken' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[12.80]',
})

i11 = Item.create({name: 'Ribs' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[12.80]',
})

i12 = Item.create({name: 'Grilled Salmon' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[12.80]',
})

i13 = Item.create({name: 'Pork Chops' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[12.80]',
})

i14 = Item.create({name: 'Kebabs' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[12.80]',
})

i11 = Item.create({name: 'Caesar Salad' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[10.80]',
})

i12 = Item.create({name: 'Halloumi Salad' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[8.95]',
})

i13 = Item.create({name: 'Chips' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[2.95]',
})

i14 = Item.create({name: 'Soup' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[3.95]',
})

i15 = Item.create({name: 'Burger' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[9.95]',
})

i16 = Item.create({name: 'Beef Noodles' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[11.95]',
})

i17 = Item.create({name: 'Chicken Noodles' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[10.95]',
})

i18 = Item.create({name: 'Potato Salad' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[3.95]',
})

i19 = Item.create({name: 'Fried Breakfast' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[9.95]',
})

i20 = Item.create({name: 'Club Sandwich' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[8.95]',
})

i21 = Item.create({name: 'Ploughmans' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[6.95]',
})

i22 = Item.create({name: 'Lobster' , 
subtype_id: sT8.id, 
sizes:'["Sgl"]', 
prices:'[27.95]',
})



