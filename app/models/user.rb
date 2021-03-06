# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  about_me        :text
#  location        :string
#  privacy         :boolean          default(FALSE)
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, :first_name, :last_name, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    validates :privacy, inclusion: {in: [true, false]}

    after_initialize :ensure_session_token
    attr_reader :password

    has_one_attached :profilePicture

    has_many :reviews,
        foreign_key: :user_id,
        class_name: "Review",
        dependent: :destroy
    
    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)

        if @user && @user.is_password?(password)
            @user 
        else
            nil
        end
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64
    end
end
