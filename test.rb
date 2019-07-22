ary = [1,2,3,4,5,6,7].shuffle!
new_ary = []

(ary.length / 2).floor.to_i.times do
  ary.length == 3 ? new_ary << ary : new_ary << ary.slice!(0,2)
end

new_ary.each do |e|
  p e
end
