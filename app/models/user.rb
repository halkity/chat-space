class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: {case_sensitive: true}

  def self.search(input, myid)
    return nil if input == ""
    User.where(['name LIKE ?', "%#{input}%"] ).where.not(id: myid).limit(10)
  end
  
end
