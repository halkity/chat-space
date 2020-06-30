require 'rails_helper'

RSpec.describe Message, type: :model do
  # メッセージを保存できる場合
  describe "can save" do
    # メッセージがあれば保存できる
    it "is valid with message[:content]" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end
    # 画像があれば保存できる
    it 'is valid with image' do
      message = build(:message, content: nil)
      expect(message).to be_valid
    end
    # メッセージと画像があれば保存できる
    it 'is valid with content and image' do
      message = build(:message)
      expect(message).to be_valid
    end
  end

  # メッセージを保存できない場合
  describe "can not save" do
    # メッセージも画像も無いと保できない
    it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      # group_idが無いと保存できない
      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      # user_idが無いと保存できない
      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
  end
end
