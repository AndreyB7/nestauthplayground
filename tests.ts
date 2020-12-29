public async createForUser(data: IOrderCreateFields, userEntity: UserEntity): Promise<Array<OrderEntity>> {
    const cartEntity = await this.cartService.findOne({user: userEntity});

    if (!cartEntity || !cartEntity.items.length) {
      throw new NotFoundException("Cart not found");
    }

    return this.connection.transaction<Array<OrderEntity>>(async manager => {
      const items = await Promise.all(data.items.filter(item => item.checked).map(item => this.processItem(itemm, manager)));

      await this.cartItemService.remove(
        manager.remove...
        //cartEntity.items.filter(item => data.items.some(e => e.checked && e.courseId === item.courseId)),
      );

      const groupedItems = items.reduce((memo, current) => {
        if (!(current.course.user.institutionId in memo)) {
          memo[current.course.user.institutionId] = [];
        }

        memo[current.course.user.institutionId].push(current);

        return memo;
      }, {} as Record<string, Array<OrderItemEntity>>);

      return Promise.all(
        Object.keys(groupedItems).map(async institutionId =>
          const orderEntity = new orderEntity;
          this.orderEntityRepository
            .create({
              institutionId: (institutionId as unknown) as number,
              orderStatus: OrderStatus.NEW,
              items: groupedItems[institutionId],
              user: userEntity,
              price: groupedItems[institutionId].reduce((memo, item) => memo + this.orderItemService.getPrice(item), 0),
            });
            orderEntity.manager.save();
        ),
      );
    });
  }

// processItem

  public async processItem(orderItem: IOrderItemCreateFields, manager: ?Function): Promise<OrderItemEntity> {
    const orderItemEntity = new OrderItemEntity();
  
    orderItemEntity.amount = 1;
  
    const courseEntity = await this.courseService.findOne(
      {id: orderItem.courseId},
      {relations: ["user", "user.institution"]},
    );
  
    if (!courseEntity) {
      throw new NotFoundException("Course not found");
    }
  
    orderItemEntity.course = courseEntity;
  
    if (orderItem.code) {
      orderItemEntity.coupon = await this.couponService.redeem(orderItem.code, courseEntity, manager);
    }
  
    return orderItemEntity;
  }


  // couponService.redeem
  public async redeem(code: string, courseEntity: CourseEntity, manager:function): Promise<CouponEntity> {
    const couponEntity = await this.findOne({code});
  
    if (!couponEntity) {
      throw new NotFoundException("Coupon not found");
    }
  
    if (couponEntity.couponStatus !== CouponStatus.ACTIVE) {
      throw new BadRequestException("Coupon is not active");
    }
  
    if (!couponEntity.redemptions) {
      throw new BadRequestException("Coupon is fully redeemed");
    }
  
    if (couponEntity.institutionId !== courseEntity.user.institutionId) {
      throw new BadRequestException("Coupon is not applicable to course");
    }
  
    couponEntity.redemptions--;
  
    return manager.save();
  }